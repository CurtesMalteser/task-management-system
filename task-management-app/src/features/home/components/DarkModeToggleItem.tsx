import { FunctionComponent, SVGProps } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './DarkModeToggle.css';

export interface DarkModeToggleItemProps {
    Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
    mode: string;
    selectedMode: string;
}

export default function DarkModeToggleItem({ Icon, mode, selectedMode}: DarkModeToggleItemProps) {
    return (<Dropdown.Item active={mode === selectedMode} eventKey={mode}>
        <Icon className={`color-mode dark-mode-toggle`} /> {mode}
    </Dropdown.Item>
    )
}
