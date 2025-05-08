import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useAccount } from "../../../hooks/useAccount";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<Login>({mode: "onBlur"});
    const { userLogin } = useAccount();
    const navigation = useNavigate();

    const onSubmit = (data: Login) => {
        console.log(data);

        userLogin.mutate(data, {
            onSuccess: (response) => {
                console.log(response);
                localStorage.setItem("token", response.token);
                localStorage.setItem("username", response.name);
                navigation("/");
            },
            onError: (error) => {
              const response = (error as AxiosError)?.response;
              const data = response?.data;

              if (data && typeof data === "object") {
                  Object.entries(data).forEach(([field, messages]) => {
                      if (Array.isArray(messages)) {
                          messages.forEach(msg => toast.error(`${field}: ${msg}`));
                      }
                  });
              } else {
                  toast.error("Something went wrong. Please try again.");
              }   
            }
        })
    }

    return (
        <Wrapper>
            <TopNav>
                <NavButton onClick={() => navigation("/")}>Home</NavButton>
                <NavButton onClick={() => navigation("/login")}>Login</NavButton>
                <NavButton onClick={() => navigation("/register")}>Register</NavButton>
            </TopNav>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <LoginText>
                    Login
                </LoginText>
                <FormGroup>
                    <Label>Email</Label>
                    <InputWrapper>
                        <InputField type="email" {...register("email", {required: "true", maxLength: 40})}/>
                        {errors.email && 
                            (errors.email?.type === "required" && <Error>Email is required</Error>)
                            ||
                            (errors.email?.type === "maxLength" && <Error>Email should be less than 40 character</Error>)
                        }
                    </InputWrapper>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <InputWrapper>
                        <InputField type="password" {...register("password", {required: "true", minLength: 8})}/>
                        {errors.password && 
                            (errors.password?.type === "required" &&<Error>Password is required</Error>)
                            ||
                            (errors.password?.type === "minLength" &&<Error>Password should be at least 8 character</Error>)
                        }
                    </InputWrapper>
                </FormGroup>
                <SubmitInput type="submit"/>
            </Form>
        </Wrapper>
    )
};

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(135deg, #2c3e50, hsl(36, 5%, 18%));
    animation: fadeIn 1s ease-in-out;

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

const TopNav = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 1rem 2rem;
    gap: 1rem;
`;

const NavButton = styled.button`
    background: none;
    border: 2px solid #00c6ff;
    color: #00c6ff;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s, color 0.3s;

    &:hover {
        background: #00c6ff;
        color: #000;
    }
`;

const Form = styled.form`
    background: #1e1e1e;
    color: white;
    width: 90%;
    max-width: 400px;
    border-radius: 16px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    animation: slideUp 0.6s ease-out;

    @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

const InputField = styled.input`
    width: 100%;
    height: 2.5rem;
    border-radius: 8px;
    border: 1px solid #444;
    padding-left: 10px;
    font-size: 1rem;
    background: #2c2c2c;
    color: #fff;
    transition: all 0.3s ease;

    &:focus {
        border: 1px solid #00c6ff;
        outline: none;
        box-shadow: 0 0 5px #00c6ff;
    }

    &:hover {
        background: #3a3a3a;
    }
`;

const LoginText = styled.h2`
    text-align: center;
    font-size: 2.2rem;
    color: #00c6ff;
    margin-bottom: 0.5rem;
    letter-spacing: 1px;
`;

const SubmitInput = styled.input`
    width: 100%;
    height: 3rem;
    border-radius: 8px;
    border: none;
    background: linear-gradient(135deg, #00c6ff, #0072ff);
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 198, 255, 0.4);
    }

    &:active {
        transform: scale(0.98);
    }
`;

const Label = styled.label`
    font-size: 1rem;
    font-weight: 500;
    color: #ccc;
`;

const Error = styled.p`
    color: #ff6b6b;
    font-size: 0.85rem;
    margin-top: 4px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export default Login;
