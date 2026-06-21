import { ParseNewickOutputModel } from "../../../../../../Services/Visualization/models/parseNewick/ParseNewickOutputModel";


export function parseNewick(newick: string):ParseNewickOutputModel {
    newick = newick.replace(/\s+/g, '');
    let index = 0;
    let nodeCounter = 0; 

    function parseNode(): ParseNewickOutputModel {
        let node: ParseNewickOutputModel = {id: '',name: ''};

        if (newick[index] === '(') {
            index++;
            node.children = [];
            while (newick[index] !== ')') {
                node.children.push(parseNode());
                    if(newick[index] === ',') {
                        index++;
                    }
            }
            index++;
        }

        let name = '';
        while (index < newick.length && newick[index] !== ':'&&
            newick[index] !== ',' && newick[index] !== ')') {
            name += newick[index++];
        }

        node.name = name || '';
        const isInternalUnnamed = !node.name || node.name === '_';
        node.id = isInternalUnnamed ? `internal-${nodeCounter++}` : `${node.name}`;
            
        if (newick[index] === ':') {
            index++;
            let lengthStr = '';
            while ( index < newick.length && /[\d\.eE+-]/.test(newick[index])) { 
                lengthStr += newick[index++];
            }
            node.edgeLength = parseFloat(lengthStr);
        }

        return node;

    }

    const root = parseNode();
    return root;
}