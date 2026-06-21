import {GetTypingDataSchemaOutputModel} from "./models/getTypingDataSchema/GetTypingDataSchemaOutputModel"
import {GetTypingDataProfilesOutputModel} from "./models/getTypingDataProfiles/GetTypingDataProfilesOutputModel"
import {GetIsolateDataKeysOutputModel} from "./models/getIsolateDataSchema/GetIsolateDataKeysOutputModel"
import {GetIsolateDataRowsOutputModel} from "./models/getIsolateDataProfiles/GetIsolateDataRowsOutputModel"
import {GetDistanceMatrixOutputModel} from "./models/getDistanceMatrix/GetDistanceMatrixOutputModel"
import {GetTreeOutputModel} from "./models/getTree/GetTreeOutputModel"
import {GetTreeViewOutputModel} from './models/getTreeView/GetTreeViewOutputModel';
import {SaveTreeViewInputModel} from "./models/saveTreeView/SaveTreeViewInputModel"
import {SaveTreeViewOutputModel} from "./models/saveTreeView/SaveTreeViewOutputModel";
import {UPGMAOutputModel} from "./models/getTreeView/GetTreeViewOutputModel";
import {MockAdministrationService} from "../Administration/MockAdministrationService";

export namespace MockVisualizationService {

    const MOCK_DIR = "/mock"
    import mockProjects = MockAdministrationService.mockProjects;
    

    let upgmaTreeState: UPGMAOutputModel = {
        newickText: '',
        depthRadius: 2,
        fileName: '',
    };
    /**
     * Get the typing data schema.
     *
     * @param projectId The project id.
     * @param typingDataId The typing data id.
     * @returns The typing data schema.
     */
    export async function getTypingDataSchema(
        projectId: string,
        typingDataId: string
    ): Promise<GetTypingDataSchemaOutputModel> {
        const project = mockProjects.get(projectId)!;
        const typingData = project.files?.typingData?.find(data => data.typingDataId === typingDataId)!;
        const typing_content = typingData.content!;
    
        const headers = typing_content.trim().split('\n')[0].split('\t').filter(h => h !== "ST");
        return {
            type: "mlst",
            loci: headers
        };
    }

    /**
     * Get the typing data profiles.
     *
     * @param projectId The project id.
     * @param typingDataId The typing data id.
     * @param limit The limit.
     * @param offset The offset.
     * @returns The typing data profiles.
     */
   export async function getTypingDataProfiles(
        projectId: string,
        typingDataId: string,
        limit: number,
        offset: number
    ): Promise<GetTypingDataProfilesOutputModel> {
        const project = mockProjects.get(projectId)!;
        const typingData = project.files?.typingData?.find(data => data.typingDataId === typingDataId)!;

        const text = typingData.content!;
        const parsedData = parseTSV(text);

        const profiles = parsedData.data.map((profileObj: Record<string, string>, index: number) => ({
            id: index.toString(),
            profile: Object.values(profileObj).map(String)
        }));
        return { 
            profiles: profiles.slice(offset, offset + limit),
            totalCount: profiles.length 
        };
    } 

    /**
     * Gets the keys of an isolate data.
     *
     * @param projectId The project id.
     * @param isolateDataId The isolate data id.
     * @returns The isolate data keys.
     */
    export async function getIsolateDataKeys(
        projectId: string,
        isolateDataId: string
    ): Promise<GetIsolateDataKeysOutputModel> {
        const project = mockProjects.get(projectId)!;
        const isolateData = project.files?.isolateData?.find(data => data.isolateDataId === isolateDataId)!;
        const isolate_content = isolateData.content!;
        const lines = isolate_content.split(/\r?\n/).filter(line => line.trim() !== '');
        const headerLine = lines[0];
        const headers = headerLine.split("\t").map(h => h.trim());

        return { keys: headers };
    }

    /**
     * Get the isolate data rows.
     *
     * @param projectId The project id.
     * @param isolateDataId The isolate data id.
     * @param limit The limit.
     * @param offset The offset.
     * @returns The isolate data rows.
     */
    export async function getIsolateDataRows(
        projectId: string,
        isolateDataId: string,
        limit: number,
        offset: number
    ): Promise<GetIsolateDataRowsOutputModel> {


        const project = mockProjects.get(projectId)!;
        const isolateData = project.files?.isolateData?.find(data => data.isolateDataId === isolateDataId)!;
        const isolate_content = isolateData.content!;

        const lines = isolate_content.split(/\r?\n/).filter(line => line.trim() !== '');
        const [headerLine, ...dataLines] = lines;

        const headers = headerLine.split("\t").map(h => h.trim());

        const data = dataLines.map(line => {
            const values = line.split("\t");
            const obj: Record<string, string> = {};
            headers.forEach((header, idx) => {
                obj[header] = values[idx] ?? "";
            });
            return obj;
        });

        const rows = data.map((profileObj: Record<string, string>, index: number) => ({
            id: (index + 1).toString(),
            profileId: (index + 1).toString(),
            row: profileObj,
        }));

        return {
            rows: rows.slice(offset, offset + limit),
            totalCount: rows.length,
        };
    }

    /**
     * Get the distance matrix.
     *
     * @param projectId The project id.
     * @param datasetId The dataset id.
     * @param distanceMatrixId The distance matrix id.
     * @returns The distance matrix.
     */
    export async function getDistanceMatrix(
        projectId: string,
        datasetId: string,
        distanceMatrixId: string
    ): Promise<GetDistanceMatrixOutputModel> {
        return {
            distances: {},
            totalCount: 0
        }
    }

    /**
     * Get the tree.
     *
     * @param projectId The project id.
     * @param datasetId The dataset id.
     * @param treeId The tree id.
     * @returns The tree.
     */
    export async function getTree(
        projectId: string,
        datasetId: string,
        treeId: string
    ): Promise<GetTreeOutputModel> {
        return "(1:0.1, (2:0.2, 3:0.3):0.4);"
    }

    /**
     * Get the tree view.
     *
     * @param projectId The project id.
     * @param datasetId The dataset id.
     * @param treeViewId The tree view id.
     * @returns The tree view.
     */
    export async function getTreeView(
        projectId: string,
        datasetId: string,
        treeViewId: string
    ): Promise<GetTreeViewOutputModel> {
        return await fetch(`${MOCK_DIR}/tree-view.json`).then(response => response.json())
    }

    /**
     * Saves a tree view coordinates and applied transformations.
     *
     * @param projectId  the id of the project
     * @param datasetId  the id of the dataset
     * @param treeViewId the id of the tree view
     * @param inputModel the input mode
     * @return the tree view
     */
    export async function saveTreeView(
        projectId: string,
        datasetId: string,
        treeViewId: string,
        inputModel: SaveTreeViewInputModel
    ): Promise<SaveTreeViewOutputModel> {
        return await new Promise(resolve => setTimeout(() => resolve({
            projectId: projectId,
            datasetId: datasetId,
            treeViewId: treeViewId
        })))
    }

    
    function parseTSV(tsvText: string) {
        const lines = tsvText.trim().replace(/\r/g, "").split("\n");
        const headers = lines[0].split("\t");

        const data = lines.slice(1).map(line => {
            const values = line.split("\t");
            const row: any= {};
            headers.forEach((header, index) => {
                row[header] = values[index] ?? "";
            });
            return row;
        });

        return { headers, data };
    }
    
    export function saveUPGMATreeState(
        newickText:string,
        depthRadius: number,
        fileName: string
    ): void {
        upgmaTreeState = {
            newickText,
            depthRadius,
            fileName,
        };
    }

    export function getUPGMATreeStat(): UPGMAOutputModel{
        return upgmaTreeState;
    }


}