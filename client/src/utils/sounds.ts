import useSound from 'use-sound'
import moveSound from '../../assets/sounds/move-self.mp3'
import captureSound from '../../assets/sounds/capture.mp3'
import checkSound from '../../assets/sounds/move-check.mp3'
import endSound from '../../assets/sounds/game-end.webm'
import castleSound from '../../assets/sounds/castle.mp3'
// import promoteSound from '../../assets/sounds/promote.mp3'
// import startSound from '../../assets/sounds/game-start.webm'
import illegalSound from '../../assets/sounds/illegal.webm'
import tenSeconds from '../../assets/sounds/tenseconds.webm'


export const useChessSounds = () => {
    const [playMove] = useSound(moveSound);
    const [playCheck] = useSound(checkSound);
    const [playCapture] = useSound(captureSound);
    const [playEnd] = useSound(endSound);
    const [playIllegal] = useSound(illegalSound);
    const [playTenSeconds] = useSound(tenSeconds);
    const [playCastle] = useSound(castleSound);
    // const [playPromote] = useSound(promoteSound);
    // const [playStart] = useSound(startSound);

    const playSound = (type: string) => {
        if (type.includes("#"))
        {
            playEnd();
        }
        else if (type.includes("+"))
        {
          playCheck();
        }
        else if (type.includes("x"))
        {
          playCapture();
        }
        else if (type.includes("O-O"))
        {
          playCastle();
        }
        else 
        {
          playMove();
        }
    };


    return {playSound, playIllegal, playTenSeconds};
}

