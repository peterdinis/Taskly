import { CheckCircle } from "lucide-react";
import { FC } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Navigation: FC = () => {
    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <CheckCircle className="h-8 w-8 text-primary" />
                    <h1 className="text-2xl font-bold">Taskly</h1>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" asChild>
                        <Link href="/app">Sign In</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/app">Get Started</Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Navigation;