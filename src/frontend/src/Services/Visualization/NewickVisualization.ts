import { ParseNewickOutputModel } from "./models/parseNewick/ParseNewickOutputModel";
import { parseNewick } from "../../Pages/Project/Tree/Dendogram/utils/parseNewick";

export namespace NewickVisualization {

    const MOCK_DIR = "/mock"

    /**
     * Get the newick data.
     *
     * @param projectId The project id.
     * @param treeDataId The tree data id.
     * @returns The tree in ParseNewickOutputModel format.
     */
    export function getNewickData(
        newickText: string
        //treeDataId: string
    ): ParseNewickOutputModel {
        return parseNewick(newickText);
        /* const file = await fetch(`${MOCK_DIR}/brucellamlva_profile_tree_upgma.txt`);
        const newickText = await file.text();        
        return parseNewick(newickText); */
    }


}