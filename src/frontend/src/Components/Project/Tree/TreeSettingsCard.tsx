import * as React from "react"
import {useState} from "react"
import {Box, Button, Collapse} from "@mui/material"
import IconButton from "@mui/material/IconButton"
import {Pause, PhotoCamera, PlayArrow, ZoomIn, ZoomOut} from "@mui/icons-material"
import { TreeNodeEdgePopertiesOptions } from "./TreeNodeEdgePropertiesOption"
import { TreeIsolateOptions } from "./TreeIsolate"
import { Row } from "../../../Services/Visualization/models/getIsolateDataProfiles/GetIsolateDataRowsOutputModel"

/**
 * Props for TreeSettingsCard component.
 */
interface TreeSettingsCardProps {
    nodeSize: number;
    setNodeSize: (value: number) => void;
    showLabel: boolean;
    setShowLabel: (Value: boolean) => void;
    labelSize: number;
    setLabelSize: (value: number) => void;
    edgeSize: number;
    setEdgeSize: (value: number) => void;
    isolateKeys: string[];
    selectedKey: string;
    setSelectedKey: (Value: string) => void;
    isolateDataRows: Row[] | undefined;
}

/**
 * Card with settings for the tree.
 */
export function TreeSettingsCard  (
    {
    nodeSize,
    setNodeSize,
    showLabel,
    setShowLabel,
    labelSize,
    setLabelSize,
    edgeSize,
    setEdgeSize,
    isolateKeys,
    selectedKey,
    setSelectedKey,
    isolateDataRows,
    }: TreeSettingsCardProps
) {

    return <Box sx={{
        opacity:  1,
        pointerEvents: "initial",
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 1,
        backgroundColor: "white",
        borderRadius: 1,
        p: 1,
        m: 1,
        border: 1,
        borderColor: 'divider',
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
    }}>
        <TreeNodeEdgePopertiesOptions
          nodeSize={nodeSize}
          setNodeSize={setNodeSize}
          showLabel={showLabel}
          setShowLabel={setShowLabel}
          labelSize={labelSize}
          setLabelSize={setLabelSize}
          edgeSize={edgeSize}
          setEdgeSize={setEdgeSize}
          selectedKey={selectedKey}
          isolateDataRows={isolateDataRows}
          />
          <TreeIsolateOptions 
            isolateKeys={isolateKeys}
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}/>
        
    </Box>
}