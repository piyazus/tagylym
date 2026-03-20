import { useTranslations } from "next-intl";
import { LuUsers } from "react-icons/lu";

export default function CoreValuesCallout() {
    const tFll = useTranslations("fll");

    return (
        <div
            className="rounded-2xl p-6 border-l-4"
            style={{
                backgroundColor: "rgba(139, 92, 246, 0.08)",
                borderColor: "#8B5CF6",
            }}
        >
            <div className="flex items-center gap-2 mb-3 text-[#4C1D95]">
                <LuUsers className="text-[#8B5CF6]" size={18} />
                <h3 className="text-lg font-bold">{tFll("core_values_title")}</h3>
            </div>

            <p className="text-sm text-[#6D28D9] leading-relaxed">{tFll("core_values_body")}</p>

            <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-[#6D28D9] text-xs font-semibold">
                {tFll("core_values_badge")}
            </div>
        </div>
    );
}

