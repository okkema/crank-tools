export interface NavigationState {
    open: boolean
}

const state = $state<NavigationState>({
    open: false,
})

export default state