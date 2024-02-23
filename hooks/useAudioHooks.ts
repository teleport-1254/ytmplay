
export const useAudioHooks = () => {

    const play = () => {
        const audioTag = document.querySelector('audio')
        if (audioTag && audioTag.paused) {
            audioTag.play()
        }
    }

    const pause = () => {
        const audioTag = document.querySelector('audio')
        if (audioTag && !audioTag.paused) {
            audioTag.pause()
        }
    }
    
    const isPaused = () => {
        const audioTag = document.querySelector('audio')
        if (audioTag) {
            return audioTag.paused
        }
    }


    return {
        play,
        pause,
        isPaused
    }
}
