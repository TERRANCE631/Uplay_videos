export const ScrollIntoView = () => {
    const scrollFunction = (scrollRef) => {
        scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }

    return { scrollFunction }
}