from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from collections import defaultdict, deque

app = FastAPI()

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes, edges):
    # Step 1: Build the adjacency list and calculate indegree for each node
    graph = defaultdict(list)
    indegree = defaultdict(int)
    
    for edge in edges:
        graph[edge.source].append(edge.target)
        indegree[edge.target] += 1
    
    # Step 2: Find all nodes with zero indegree (start nodes)
    zero_indegree = deque([node.id for node in nodes if indegree[node.id] == 0])
    
    topological_order = []
    
    # Step 3: Perform topological sorting using Kahn's algorithm
    while zero_indegree:
        node = zero_indegree.popleft()
        topological_order.append(node)
        
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                zero_indegree.append(neighbor)
    
    # Step 4: Check if all nodes were included in the topological sort
    if len(topological_order) == len(nodes):
        return True  # It is a DAG
    else:
        return False  # It is not a DAG

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    nodes = pipeline.nodes
    edges = pipeline.edges
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # Check if the pipeline forms a Directed Acyclic Graph (DAG)
    is_dag_result = is_dag(nodes, edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag_result
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
