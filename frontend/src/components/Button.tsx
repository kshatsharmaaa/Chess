export const Button = ({onClick, children}: {onClick:() => void, children: React.ReactNode}) => {
    return <button onClick={onClick} className="text-2xl bg-violet-400 hover:bg-violet-500 text-white font-bold py-4 px-8 rounded">{children}</button>
}