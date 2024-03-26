import React, { useState, useEffect } from 'react';
import { useVuic } from './VuicContext';
import { FaMicrophone } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: scale(1.0);
  }
  50% {
    transform: scale(1.2);
  }
`;

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  border: none;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.7);
  transition: background-color 0.3s ease-in-out;
  background-color: ${props => props.color};

  &.STATE_RECORDING_START {
    animation: ${spin} 2s infinite;
  }

  &.STATE_PROCESSING_START {
    animation: ${bounce} 2s infinite linear;
  }

  &.STATE_AUDIO_START {
    animation: ${pulse} 2s infinite;
  }
`;

const VuicButton = ({ buttonText = 'Record', ...props }) => {
    const vuic = useVuic();
    const [recordingState, setRecordingState] = useState('STATE_IDLE');
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        if (vuic) {
            const handleStateChange = (newState) => {
                setRecordingState((prevState) => {
                    if (newState === 'STATE_AUDIO_END') {
                        newState = 'STATE_IDLE';
                    }
                    setButtonDisabled(newState !== 'STATE_IDLE');
                    return newState;
                });
            };

            vuic.on('stateChange', handleStateChange);

            return () => {
                vuic.off('stateChange', handleStateChange);
            };
        }
    }, [vuic]);

    const handleButtonClick = () => {
        if (vuic) {
            vuic.startVoiceRecording();
        }
    };

    const stateToColor = {
        STATE_IDLE: '#ff0000', // Red for idle state
        STATE_RECORDING_START: '#32CD32', // Lime green for recording start
        STATE_RECORDING_END: '#228B22', // Forest green for recording end
        STATE_PROCESSING_START: '#1E90FF', // Dodger blue for processing start
        STATE_PROCESSING_END: '#00008B', // Dark blue for processing end
        STATE_AUDIO_START: '#800080', // Purple for audio start
        STATE_AUDIO_END: '#4B0082', // Indigo for audio end
    };

    return (
        <Button
            onClick={handleButtonClick}
            disabled={isButtonDisabled}
            className={recordingState}
            color={stateToColor[recordingState]}
            {...props}
        >
            <FaMicrophone />
        </Button>
    );
};

export { VuicButton };