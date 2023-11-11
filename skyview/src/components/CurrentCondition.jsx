import React from 'react';

const CurrentCondition = ({ isDay, conditionCode }) => {
    const imageSrc = conditionCode?.icon ? conditionCode?.icon : isDay ? 'sun' : 'moon';

    return <img src={imageSrc} alt={conditionCode?.text || (isDay ? 'sun' : 'moon')} />;
}

export default CurrentCondition;