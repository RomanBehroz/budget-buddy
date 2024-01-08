import React from 'react';
import '../pages/css/Dashboard.css';
import '../pages/css/Setbudget.css';


interface PopupWindowProps {
    msg: string | null | undefined;
    buttonATxt: string;
    buttonAFunc: () => void;
    buttonBTxt: string;
    buttonBFunx: () => void;
}

const PopupWindow: React.FC<PopupWindowProps> = ({
                                                     msg,
                                                     buttonATxt,
                                                     buttonAFunc,
                                                     buttonBTxt,
                                                     buttonBFunx,
                                                 }) => {
    return (
        <>
            <div className="delete-window">

                <p style={{ color: 'red' }}>{msg}</p>
                <br />
                <div className="buttons">
                    <button onClick={buttonAFunc} className="button">
                        {buttonATxt}
                    </button>
                    <button onClick={buttonBFunx} className="button red">
                        {buttonBTxt}
                    </button>
                </div>
            </div>
        </>
    );
};

export default PopupWindow;
