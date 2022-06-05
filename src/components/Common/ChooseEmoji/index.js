import React, { useRef, useState } from 'react';
import { EmojiIcon } from '../../../assets/icon';
import { ChooseEmojiWrapper } from './ChooseEmoji.style';

const ChooseEmoji = ({ setContent, content }) => {
    const emojiRef = useRef();
    const reactions = [
        '❤️',
        '😆',
        '😯',
        '😢',
        '😡',
        '👍',
        '👎',
        '😄',
        '😂',
        '😍',
        '😘',
        '😗',
        '😚',
        '😳',
        '😭',
        '😓',
        '😤',
        '🤤',
        '👻',
        '💀',
        '🤐',
        '😴',
        '😷',
        '😵',
    ];

    return (
        <ChooseEmojiWrapper>
            
                    <EmojiIcon onClick={() => emojiRef.current.focus()}/>
                   
                    <input ref={emojiRef} autoFocus={true}  type="text" id="emoji"/>
                    <label htmlFor="emoji"
                        className="icons__list"
                    >
                        <p>Chọn cảm xúc</p>
                        <div  onMouseDown={(e)=>{
                            e.preventDefault();
                        }}  className="reactions">
                            {reactions.map((icon) => (
                                <span
                               
                                key={icon}
                                onMouseDown={(e) =>{
                                    e.preventDefault();
                                    setContent(
                                        icon
                                    )
                                    }
                                    }
                                >
                                    {icon}
                                </span>
                            ))}
                        </div>
                    </label>
        </ChooseEmojiWrapper>
    );
};

export default ChooseEmoji;
