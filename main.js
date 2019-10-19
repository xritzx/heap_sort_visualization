

function maxHeapify(ar, n){
    for (var i = Math.floor(n/2-1) ; i >= 0 ; i--) {
        heapify(ar, i, n);
    }
}

function swap(ar, from, to) {
    var temp = ar[from];
    ar[from] = ar[to];
    ar[to] = temp;
}

function heapify(ar, i, n) {
    this.exists = (i) => {
        return i<n ? true:false;
    }

    var leftchild = 2*i + 1;
    var rightchild = leftchild + 1; // 2*i + 2
    var largest = i;

    if(exists(leftchild) && ar[leftchild]>ar[largest]){
        largest = leftchild;
    }
    if(exists(rightchild) && ar[rightchild]>ar[largest]){
        largest = rightchild;
    }

    if(largest !== i){
        swap(ar, i, largest);
        heapify(ar, largest, n);
    }
}

function heapSort(arr) {
    
    var ar = [...arr];
    var ar_sorted = [];
    var n = ar.length;
    var len = n;
    maxHeapify(ar, n);

    for (var i = len - 1; i > 0; i--) { 
        swap(ar, 0, i);
        ar_sorted.push(ar.pop());
        n--;
        heapify(ar, 0, n);
    }
    return ar_sorted;
}


// Drawing functions
function node(x, y, value) {
    if(value){
    ellipse(x,y,50,50);
    text(String(value), x-7, y-5, x+7, y+5);
    }
}

function tree(ar) {

    var n = ar.length;
    var i = 0;

    while(i<=Math.log2(n)) {

        var node_per_state = Math.pow(2, i);
        var y_print_offset = 100;
        
        var j=1;

        while (j<=node_per_state) {
            
            var spacing = width / node_per_state;
            node(spacing*j-spacing/2, y_print_offset*(i+1), ar[node_per_state+j-2]);
            j++;

        }
        i++;
    }
}


var input;
var heap_button;
var max_heapify_button;
var sort_heap_button;

function setup() {

    var canvas = createCanvas(720,1280);
    canvas.position(width/2,50);
    background(12);

    input = createInput();
    input.position(width/2, '20px');
    input.style('font-size', '20px');
    
    heap_button = createButton('Heapify');
    heap_button.position(width/2, 50);
    heap_button.mousePressed(draw_heap);
    
  }

function draw_heap() {

    ar = split(input.value(), " ");
    background(10);
    tree(ar);

    max_heap_button = createButton('Max Heapify');
    max_heap_button.position(width/2+250, 50);
    max_heap_button.mousePressed(draw_max_heap);

}

function draw_max_heap(){
    
    var arr = split(input.value(), " ");
    background(10);
    maxHeapify(arr, arr.length);
    tree(arr);

    sort_heap_button = createButton('Heap Sort');
    sort_heap_button.position(width/2+500, 50);
    sort_heap_button.mousePressed(draw_sorted_heap);
}

function draw_sorted_heap() { 
    background(10);
    var ar = split(input.value(), " ").map(Number);
    var arr = heapSort(ar);
    console.log(arr);
    tree(arr);
 }
