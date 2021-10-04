import {memo, useCallback, useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import * as React from "react";

interface UseInfiniteScrollProps {
    fetchMore?: any;
    retrieveAttributes?: string;
    count?: number;
    data: any;
}

const useInfiniteScroll = ({
                                       data,
                                       fetchMore,
                                       retrieveAttributes = "",
                                       count = 20
                                   }: UseInfiniteScrollProps) => {
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [refresher, setRefresher] = useState<string>(uuidv4());
    const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
    const [income, setIncome] = useState<Array<any>>(data);
    const [lastId, setLastId] = useState<string>(income[income.length - 1]?.id ?? "");
    const isNotMounted = React.useRef(false);

    useEffect(() => {
        return () => {
            isNotMounted.current = true;
        };
    }, []);

    useEffect(() => {
        if (income) {
            setLastId(income[income.length - 1]?.id ?? "");
        }
    }, [income, lastId]);

    const loadMore = useCallback(async () => {
        const lastAdd5 = new Date(lastUpdate.getTime() + 2000);
        if (fetchMore && (new Date().getTime() > lastAdd5.getTime())) {
            try {
                setLoading(() => true);
                const data = await fetchMore({
                    variables: {
                        first: count,
                        after: lastId,
                    }
                });
                if (!data?.data) return;
                const value = data.data as any;
                const adding = value?.[retrieveAttributes]?.edges.map((input: any) => input?.node) ?? [];
                setIncome([...(income ?? []), ...adding]);
                setRefresher(uuidv4());
                if ((adding?.length ?? 0) < count && !isNotMounted.current) {
                    setHasMore(() => false);
                }
            } catch (e) {
                console.log("Error ", e)
            } finally {
                if (!isNotMounted.current) {
                    setLoading(() => false);
                    setLastUpdate(() => new Date());
                }
            }
        } else {
            setLoading(() => true);
            setTimeout(() => {
                setLoading(() => false);
            }, 2000);
        }
    }, [setIncome, lastId]);

    return {
        hasMore, loading, loadMore, income, refresher
    }

}

export default (useInfiniteScroll);
