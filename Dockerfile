# Build stage for React client
FROM node:20-alpine AS client-build
WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client/ .
RUN npm run build

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Build stage for .NET API
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release

WORKDIR /src
COPY ["server/API/API.csproj", "API/"]
COPY ["server/Application/Application.csproj", "Application/"]
COPY ["server/Domain/Domain.csproj", "Domain/"]
COPY ["server/Persistence/Persistence.csproj", "Persistence/"]

# RESTORE
RUN dotnet restore "API/API.csproj"
COPY . .

WORKDIR "/src/API"
RUN dotnet build "API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base As final
WORKDIR /app
COPY --from=publish /app/publish .
# Copy React build into wwwroot
COPY --from=client-build /app/client/dist ./wwwroot
ENTRYPOINT ["dotnet", "API.dll"]