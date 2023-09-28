import { MENU_ITEMS } from "@/constants";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onActionItemClick } from "@/redux/slice/menuSlice";
import { socket } from "@/socket";

const Board = () => {

    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    const shouldDraw = useRef(false);
    const drawHistory = useRef([]);
    const historyPointer = useRef(null);

    const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
    const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

    useEffect(() => {
        if(!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if(actionMenuItem === MENU_ITEMS.DOWNLOAD) {
            const URL = canvas.toDataURL();
            const anchor = document.createElement('a');
            anchor.href = URL;
            anchor.download = 'canvas.jpg';
            anchor.click();
        } else if(actionMenuItem === MENU_ITEMS.UNDO) {
            if(historyPointer.current > 0) historyPointer.current -= 1;
            const imageData = drawHistory.current[historyPointer.current];
            context.putImageData(imageData,0,0)
        } else if(actionMenuItem === MENU_ITEMS.REDO) {
            if(historyPointer.current < drawHistory.current.length - 1) historyPointer.current += 1;
            const imageData = drawHistory.current[historyPointer.current];
            context.putImageData(imageData,0,0)
        }
        dispatch(onActionItemClick(null));
    },[actionMenuItem])

    useEffect(() => {
        if(!canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const changeConfig = () => {
            context.strokeStyle = color;
            context.lineWidth = size;
        }

        changeConfig();
    },[color, size]);

    useLayoutEffect(() => {
        if(!canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        //when mounting
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const beginPath = (x, y) => {
            context.beginPath();
            context.moveTo(x,y);
        }

        const drawLine = (x, y) => {
            context.lineTo(x, y);
            context.stroke();
        }

        const handleMouseDown = (e) => { 
            shouldDraw.current = true;
            beginPath(e.clientX, e.clientY);
        }

        const handleMouseUp = (e) => { 
            shouldDraw.current = false

            const imageData = context.getImageData(0,0,canvas.width,canvas.height);

            console.log("imageData",imageData);

            drawHistory.current.push(imageData);
            historyPointer.current = drawHistory.current.length - 1; 
        }

        const handleMouseMove = (e) => { 
            if(!shouldDraw.current) return;

            drawLine(e.clientX, e.clientY);
        }

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mousemove', handleMouseMove);

        // socket.io('connect', () => {
        //     console.log("socket connecte clinet",)
        // });

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
        }

    },[]);

    return (
        <canvas ref={canvasRef}>
        </canvas>
    )
}

export default Board;