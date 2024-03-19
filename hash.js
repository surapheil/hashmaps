class Node{
    constructor(key,value=null,next=null){
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

class hashMap{
    constructor(){
        this.bucketsArray = new Array(16).fill(null);
        this.loadFactor = 0.75;
        this.capacity = this.bucketsArray.length;
        this.occupied = 0;
    }

    hash = (key) => {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
     
        return hashCode;
      } 
    
    resize = () =>{
        let oldArray = this.bucketsArray;
        this.capacity *=2 ;
        this.bucketsArray = new Array(this.capacity).fill(null);
        this.occupied = 0;
        oldArray.forEach((bucket)=>{
            let cur =  bucket;
            while(cur != null ){
                this.set(cur.key , cur.value); //insert
                cur =  cur.next;
            }
        })
    }  

    set = (key, value) => {
        if(this.occupied / this.capacity >= this.loadFactor){
            this.resize();
        }
        const bucket = this.hash(key);
        //if the key is not in the bucketArray
        if (!this.has(key)){
            let newNode =  new Node(key,value);
            if(this.bucketsArray[bucket]===null){
                this.bucketsArray[bucket] = newNode;
                this.occupied++;
            }else{
                let cur = this.bucketsArray[bucket];
                while(cur.next != null){
                    cur = cur.next
                }
                cur.next = newNode;
            }
            
        }else{
            let curr = this.bucketsArray[bucket];
            while(curr != null && curr.key != key){
                curr = curr.next
            }
            curr.value = value;


        }
      }


    get = (key) =>{
        bucket = this.hash(key);
        let cur = this.bucketsArray[bucket];
        while(cur!== null){
            if(cur.key === key){
                return cur.value
            }
            cur= cur.next
        }
        return null;
    }  


    has = (key) =>{
        const bucket = this.hash(key);
        const cur = this.bucketsArray[bucket];
        while(cur !== null){
            if(cur.key === key){
                return true;
            }
            cur = cur.next

        }
        return false;
    }   


    remove = (key) =>{
        const bucket = this.hash(key);
        let cur = this.bucketsArray[bucket];
        let prev = null;
        
        while(cur != null){
            if (cur.key === key){
                if (prev == null){
                    this.bucketsArray[bucket] = cur.next;
                }else{
                    prev.next = cur.next;
                }
                return true;
            }
            prev = cur;
            cur = cur.next;
        }
        return false;  // did not find the key
    }

    length = () =>{
        let ctr = 0;
        this.bucketsArray.forEach((bucket)=>{
            let cur = bucket;
            if (cur!=null) {
                ctr++;
                while(cur.next!==null){
                   ctr++ ;
                   cur=cur.next;
                }   
            }
        });
        return ctr;
    }

    clear = ()=>{
        this.bucketsArray = new Array(16).fill(null).map(LL=>new LinkedList());
        this.occupied = 0;
    }

    keys = () =>{
        let res = []
        this.bucketsArray.forEach((bucket)=>{
            let cur = bucket;
            if(cur!==null){
                res.push(cur.key);
                while(cur.next != null){
                    cur = cur.next;
                    res.push(cur.key)
                }
            }   
        });
        return res;
    }


    values = () =>{
        this.bucketsArray.forEach((bucket)=>{
            let cur = bucket;
            if(cur!==null){
                res.push(cur.value);
                while(cur.next != null){
                    cur = cur.next;
                    res.push(cur.value)
                }
            }   
        });
        return res;
    }

    //return both key and value
    enteries = () =>{
        let result = [];
        this.bucketsArray.forEach((bucket)=>{
            let cur = bucket;
            if  (cur !== null) {
                result.push([cur.key,cur.val]);
                while(cur.next!=null) {
                    cur = cur.next
                    result.push([cur.key, cur.val])
                }
            }
        })
        return result;
    }
        


}