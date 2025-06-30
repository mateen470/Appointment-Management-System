import { Loader2 } from "lucide-react"

export function Loading() {
    return (
        <div className="fixed inset-0 bg-gray-50/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-gray-600" />
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse" />
            </div>
        </div>
    );
}