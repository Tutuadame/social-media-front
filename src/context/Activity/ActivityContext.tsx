import React, {
    createContext,
    Dispatch,
    MutableRefObject,
    ReactNode,
    SetStateAction,
    useContext,
    useRef,
    useState
} from "react";
import {ConnectionResponse} from "../../interface/profile/connection.ts";

interface ActivityContextType {
    category: "Posts" | "Requests" | "";
    switchCategory: (profile: string) => void,
    requestPage: MutableRefObject<number>,
    postPage: MutableRefObject<number>,
    pendingConnections: ConnectionResponse[],
    setPendingConnections: Dispatch<SetStateAction<ConnectionResponse[]>>,
}

export const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const ActivityMenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [category, setCategory] = useState<"Posts" | "Requests" | "">("Requests");
    const [pendingConnections, setPendingConnections] = useState<ConnectionResponse[]>([]);
    const requestPage = useRef(0);
    const postPage = useRef(0);

    const switchCategory = (category: string) => {
        if(category === "Posts" || category === "Requests" || category === "") {
            setCategory(category);
        } else {
            throw new Error("There is no menu option for: "+category);
        }
    }

    return (
        <ActivityContext.Provider value={{ category, switchCategory, postPage, requestPage, pendingConnections, setPendingConnections }}>
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