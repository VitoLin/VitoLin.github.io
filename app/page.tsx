import SpinningCube from "./components/SpinningCube";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <SpinningCube />
        </div>
    );
}
