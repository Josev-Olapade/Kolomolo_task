import * as fs from 'fs';
import * as path from 'path';

// A node in the expression tree
type TreeNode = 
  | { value: number } 
  | { action: '+' | '-' | '*' | '/' | '^'; left: TreeNode; right: TreeNode };


function evaluateTree(tree: TreeNode): number {
  const stack: { node: TreeNode; visited: boolean }[] = [];
  const results = new Map<TreeNode, number>();

  stack.push({ node: tree, visited: false });

  while (stack.length > 0) {
    const frame = stack.pop()!;
    const { node, visited } = frame;

    if ('value' in node) {
      results.set(node, node.value);
    } else if (visited) {
      const leftVal = results.get(node.left!)!;
      const rightVal = results.get(node.right!)!;

      let result: number;
      switch (node.action) {
        case '+': result = leftVal + rightVal; break;
        case '-': result = leftVal - rightVal; break;
        case '*': result = leftVal * rightVal; break;
        case '/':
          if (rightVal === 0) throw new Error("Division by zero");
          result = leftVal / rightVal;
          break;
        case '^': result = Math.pow(leftVal, rightVal); break;
        default: throw new Error(`Unknown operation: ${node.action}`);
      }

      console.log(`${leftVal} ${node.action} ${rightVal} = ${result}`);
      results.set(node, result);
    } else {
      // Visit later after children
      stack.push({ node, visited: true });
      if (node.right) stack.push({ node: node.right, visited: false });
      if (node.left) stack.push({ node: node.left, visited: false });
    }
  }

  return results.get(tree)!;
}

// -------- Main Execution --------
const filename = process.argv[2];
if (!filename) {
  console.error("Please provide a filename: ts-node index.ts sample_data.json");
  process.exit(1);
}

// Read and parse the JSON file
const filepath = path.resolve(process.cwd(), filename);
const fileContent = fs.readFileSync(filename, 'utf-8');
const tree: TreeNode = JSON.parse(fileContent);

// Try to evaluate the expression tree
try {
  const result = evaluateTree(tree);
  console.log(`Final Result: ${result}`);
} catch (error: any) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
