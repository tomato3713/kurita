"use client";

import React, { useState } from "react";

type Props = Readonly<{
  tabs: TabItem[];
  defaultOpenKey: string;
}>;

export function Tab({ tabs, defaultOpenKey }: Props) {
  const [tabKey, setTabKey] = useState<string>(defaultOpenKey);

  // TODO: fix type annotation
  const handleClick = (e: any) => {
    setTabKey(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className={`flex-initial w-50 flex-row`}>
        {tabs.map((e) => {
          return (
            <button
              key={`tab-item-${e.title}`}
              className={`tab-header-item font-midium mr-2 ${e.tabKey === tabKey && "text-red"}`}
              onClick={handleClick}
              value={e.tabKey}
            >
              {e.title}
            </button>
          );
        })}
      </div>
      <div className="flex-col">
        {tabs.find((e) => e.tabKey === tabKey)?.content}
      </div>
    </div>
  );
}

export type TabItem = {
  tabKey: string;
  title: string;
  content?: React.ReactNode;
};
