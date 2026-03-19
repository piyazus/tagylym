"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { supabase } from "@/lib/supabase";
import type { ChecklistBlockProps } from "@/types";

export default function ChecklistBlock({ items, levelId }: ChecklistBlockProps) {
    const t = useTranslations("level");
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    useEffect(() => {
        // Initialize all items as unchecked
        const initial: Record<string, boolean> = {};
        items.forEach((item) => {
            initial[item.id] = false;
        });
        setCheckedItems(initial);

        // Try to load from Supabase
        loadProgress();
    }, [items]);

    const loadProgress = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data } = await supabase
                .from("checklist_progress")
                .select("item_id, checked")
                .eq("user_id", user.id);

            if (data) {
                const progress: Record<string, boolean> = {};
                data.forEach((row) => {
                    progress[row.item_id] = row.checked;
                });
                setCheckedItems((prev) => ({ ...prev, ...progress }));
            }
        } catch {
            // Not logged in or error — use local state
        }
    };

    const toggleItem = async (itemId: string) => {
        const newChecked = !checkedItems[itemId];
        setCheckedItems((prev) => ({ ...prev, [itemId]: newChecked }));

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            await supabase.from("checklist_progress").upsert({
                user_id: user.id,
                item_id: itemId,
                checked: newChecked,
            });
        } catch {
            // Persist locally only
        }
    };

    const completedCount = Object.values(checkedItems).filter(Boolean).length;
    const totalCount = items.length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return (
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5">
            {/* Progress bar at top */}
            <div className="mb-4">
                <div className="text-xs text-[#6B7280] mb-2 font-medium">
                    {completedCount} / {totalCount} орындалды
                </div>
                <div className="w-full h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#2563EB] rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>

            <ul className="space-y-0">
                {items
                    .sort((a, b) => a.order - b.order)
                    .map((item) => (
                        <li key={item.id} className="py-2.5 border-b border-[#F3F4F6] last:border-0 hover:bg-[#F9FAFB] transition-colors -mx-2 px-2 rounded-md">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={checkedItems[item.id] || false}
                                    onChange={() => toggleItem(item.id)}
                                    className="mt-0.5 w-4 h-4 rounded border-[#D1D5DB] flex-shrink-0 cursor-pointer text-[#2563EB] focus:ring-[#2563EB]/30 bg-white checked:bg-[#2563EB] checked:border-[#2563EB]"
                                />
                                <span
                                    className={`text-sm leading-relaxed transition-colors ${checkedItems[item.id]
                                        ? "text-[#9CA3AF] line-through"
                                        : "text-[#374151]"
                                        }`}
                                >
                                    {item.text}
                                </span>
                            </label>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
