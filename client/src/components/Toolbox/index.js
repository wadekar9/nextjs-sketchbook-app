import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.css';
import { COLORS, MENU_ITEMS } from '@/constants';
import { changeBrushSize, changeColor } from '@/redux/slice/toolboxSlice';
import cx from 'classnames';

const ToolBox = () => {

    const dispatch = useDispatch();

    const { activeMenuItem } = useSelector((state) => state.menu);
    const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

    const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;
    const showBrushToolOption = activeMenuItem === MENU_ITEMS.PENCIL || activeMenuItem === MENU_ITEMS.ERASER;

    const updateBrushSize = (e) => {
        dispatch(changeBrushSize({ item : activeMenuItem, size : e.target.value }))
    }

    const updateColor = (newColor) => {
        dispatch(changeColor({ item : activeMenuItem, color : newColor }))
    }

    return (
        <div className={styles.toolBoxContainer}>
            {
                showStrokeToolOption &&
                    <div className={styles.toolItem}>
                        <h4 className={styles.toolText}>Stroke Color</h4>
                        <div className={styles.itemContainer}>
                            {Object.values(COLORS).map((ele, index) => {
                                return(
                                    <div
                                        key={index}
                                        className={cx(styles.colorBox, {[styles.active]: color === ele})}
                                        style={{ backgroundColor : ele }}
                                        onClick={() => updateColor(ele)}
                                    />
                                )
                            })}
                        </div>
                    </div>
            }
            {
                showBrushToolOption && <div className={styles.toolItem}>
                <h4 className={styles.toolText}>Brush Size</h4>
                <div className={styles.itemContainer}>
                    <input value={size} type='range' min={1} max={10} step={1} onChange={updateBrushSize} />
                </div>
            </div>
            }
        </div>
    )
}

export default ToolBox;