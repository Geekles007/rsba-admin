import {memo} from "react";
import {SkeletonText} from "carbon-components-react";
import styled from "styled-components";

const EmptyStateWrapper = styled.div`
  margin: 1em 0;
`;

const EmptyPreviewState = () => {

    return (
        <EmptyStateWrapper>
            <SkeletonText />
            <SkeletonText />
            <SkeletonText />
            <SkeletonText />
            <SkeletonText />
            <SkeletonText />
            <SkeletonText />
            <SkeletonText width={"60%"} />
            <SkeletonText width={"50%"} />
        </EmptyStateWrapper>
    );

}

export default memo(EmptyPreviewState);