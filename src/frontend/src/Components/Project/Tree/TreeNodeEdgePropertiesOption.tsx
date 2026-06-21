import {Button, Checkbox, Collapse, FormControlLabel, FormGroup, Typography, Box, FormControl, InputLabel, MenuItem} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { InputSlider } from "../TreeView/InputSlider";
import * as React from "react";
import { Row } from "../../../Services/Visualization/models/getIsolateDataProfiles/GetIsolateDataRowsOutputModel";

const NODE_SIZE_MIN = 1
const NODE_SIZE_MAX = 20
const NODE_SIZE_STEP = 0.5

const NODE_LABEL_SIZE_MIN = 1
const NODE_LABEL_SIZE_MAX = 100
const NODE_LABEL_SIZE_STEP = 1

const EDGE_SIZE_MIN = 1
const EDGE_SIZE_MAX = 20
const EDGE_SIZE_STEP = 0.5

export interface TreeNodePropertiesOptionsProps {
    nodeSize: number;
    setNodeSize: (value: number) => void;
    showLabel: boolean;
    setShowLabel: (Value: boolean) => void;
    labelSize: number;
    setLabelSize: (value: number) => void;
    edgeSize: number;
    setEdgeSize: (value: number) => void;
    selectedKey: string;
    isolateDataRows?: Row[];
    isolateColorMap?: Map<string, string>;
}


export function TreeNodeEdgePopertiesOptions(
    {
        nodeSize,
        setNodeSize,
        showLabel,
        setShowLabel,
        labelSize,
        setLabelSize,
        edgeSize,
        setEdgeSize
    }: TreeNodePropertiesOptionsProps
) {
    const [expanded, setExpanded] = React.useState(false);
    const [edgeExpanded, setEdgeExpanded] = React.useState(false);

    return <>
        <Button
            onClick={() => setExpanded(!expanded)}
            size={"small"}
            startIcon={<ExpandMoreIcon color={"inherit"}/>}
        >
            Node Properties
        </Button>
        <Collapse in={expanded} timeout={"auto"}
                  sx={{border: 1, borderColor: 'divider', borderRadius: 1, p: 3}}
                  unmountOnExit>
            <Typography variant={"body2"}>Node Size</Typography>
            <InputSlider
                value={nodeSize}
                onChange={setNodeSize}
                min={NODE_SIZE_MIN} max={NODE_SIZE_MAX} step={NODE_SIZE_STEP}/>

            <FormGroup>
                <FormControlLabel label=" Show Node Label" control={<Checkbox
                    size="small"
                    checked={showLabel}
                    onChange={(event) => setShowLabel(event.target.checked)}/>}/>
            </FormGroup>

            {<Collapse  in={showLabel} timeout={"auto"}
                  sx={{border: 1, borderColor: 'divider', borderRadius: 1, p: 3}}
                  unmountOnExit>
                <Typography variant={"body2"}>Node Label Size</Typography>
                <InputSlider
                    value={labelSize}
                    onChange={setLabelSize}
                    min={NODE_LABEL_SIZE_MIN} max={NODE_LABEL_SIZE_MAX} step={NODE_LABEL_SIZE_STEP}/>
            </Collapse>}
        <Button
            onClick={() => setEdgeExpanded(!edgeExpanded)}
            size={"small"}
            startIcon={<ExpandMoreIcon color={"inherit"}/>}
        >
            Edge Properties
        </Button>
        <Collapse in={edgeExpanded} timeout={"auto"}
                  sx={{border: 1, borderColor: 'divider', borderRadius: 1, p: 3}}
                  unmountOnExit>
            <Typography variant={"body2"}>Edge Size</Typography>
            <InputSlider
                value={edgeSize}
                onChange={setEdgeSize}
                min={EDGE_SIZE_MIN} max={EDGE_SIZE_MAX} step={EDGE_SIZE_STEP}/>
        </Collapse>
        </Collapse>
    </>
}