import { createContext, MutableRefObject, ReactNode, useContext, useRef, useState } from "react";

interface ActivityContextType {
    category: "Posts" | "Connections" | "";
    switchCategory: (profile: string) => void,    
    tablePage: MutableRefObject<number>,    
}

export const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const ActivityMenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [category, setCategory] = useState<"Posts" | "Connections" | "">("Connections");    
    const tablePage = useRef(0);

    const switchCategory = (category: string) => {
        if(category === "Posts" || category === "Connections" || category === "") {
            setCategory(category);
        } else {
            throw new Error("There is no menu option for: "+category);
        }
    }

    return (
        <ActivityContext.Provider value={{ category, switchCategory, tablePage }}>
          {children}
        </ActivityContext.Provider>
    );
}

export function useActivityContext() {
    const activityContext = useContext(ActivityContext);
    
    if (activityContext === undefined) {
        throw new Error("useActivityContext must be used with with ActivityContext!");
    }

    return activityContext;
}