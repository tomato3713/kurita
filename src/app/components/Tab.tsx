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
    <div className="flex flex-col w-full md:w-10/12">
      <div className="w-full justify-center">
        <div className={`flex justify-center w-full border-b border-blue-700`}>
          {tabs.map((e) => {
            return (
              <button
                key={`tab-item-${e.title}`}
                className={`w-1/3 max-w-30 p-0 font-midium hover:font-bold me-2 border-b border-blue-200 rounded-t-lg text-l md:text-xl bg-blue-200 ${e.tabKey === tabKey && "bg-blue-700 text-gray-100"}`}
                onClick={handleClick}
                value={e.tabKey}
              >
                {e.title}
              </button>
            );
          })}
        </div>
      </div>
      <div className="p-5">
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
