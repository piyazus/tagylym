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
        <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <span className="text-xl">✅</span>
                    {t("checklist")}
                </h3>
                <span className="text-sm text-muted">
                    {completedCount}/{totalCount} ({percentage}%)
                </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-surface-lighter rounded-full mb-5 overflow-hidden">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-beginner to-advanced transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <ul className="space-y-2">
                {items
                    .sort((a, b) => a.order - b.order)
                    .map((item) => (
                        <li key={item.id}>
                            <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-lighter/30 cursor-pointer transition-colors group">
                                <input
                                    type="checkbox"
                                    checked={checkedItems[item.id] || false}
                                    onChange={() => toggleItem(item.id)}
                                    className="mt-0.5 w-5 h-5 rounded border-2 border-surface-lighter text-accent focus:ring-accent/30 focus:ring-offset-0 bg-transparent cursor-pointer accent-accent"
                                />
                                <span
                                    className={`text-sm leading-relaxed transition-colors ${checkedItems[item.id]
                                            ? "text-muted line-through"
                                            : "text-slate-300 group-hover:text-white"
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
