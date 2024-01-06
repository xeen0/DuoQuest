import { KeyboardControls } from '@react-three/drei'

const controls = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'right', keys: ['ArrowRight', 'KeyD'] },
]

function NavigationControls({ children }) {
    return <KeyboardControls map={controls}>{children}</KeyboardControls>
}

export { NavigationControls }
