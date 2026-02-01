export default function Loading() {
    return (
        <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
            <div className="text-center">
                {/* Logo */}
                <div className="w-16 h-16 bg-[#1E5AFF] rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <span className="text-white font-bold text-2xl">T</span>
                </div>

                {/* Spinner */}
                <div className="w-12 h-12 border-4 border-[#E2E8F0] border-t-[#1E5AFF] rounded-full animate-spin mx-auto mb-4"></div>

                {/* Text */}
                <p className="text-[#4A5568]">Загрузка...</p>
            </div>
        </div>
    );
}
