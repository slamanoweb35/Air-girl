import { useLoading } from "../../globalContext/loading"
import { useScore } from "../../globalContext/score"
import { useStart } from "../../globalContext/start"
import { usePause } from "../../globalContext/pause"
import { useEffect } from "react"
import "../../css/score.css"

const Score = () => {
    let score = useScore()
    let start = useStart()
    let pause = usePause()
    let loading = useLoading()

    useEffect(() => {
        if (typeof score.pits == "number" &&
            !loading.waiting.score) {
            loading.setWaiting({
                bestScore: loading.waiting.bestScore,
                floor: loading.waiting.floor,
                gameOver: loading.waiting.gameOver,
                obstcle: loading.waiting.obstcle,
                pause: loading.waiting.pause,
                player: loading.waiting.player,
                score: true,
                theme: loading.waiting.theme
            })
        }

        if (!start.canStart) return;
        if (pause.active) return;

        let time = setTimeout(() => {
            score.setPits(++score.pits)
        }, 1000 * 1.5)

        return () => clearTimeout(time)
    }, [score.pits,pause.active])

    return (<>
        <p id="score">Score: {
            score.pits
        }</p>
    </>)
}

export default Score