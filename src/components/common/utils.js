export function tsvJSON(tsv){


        const lines = tsv.split('\n');
        const headers = lines.shift().split('\t');
        var result = lines.map(line => {
          const data = line.split('\t');
          return headers.reduce((obj, nextKey, index) => {
            obj[nextKey] = data[index];
            return obj;
          }, {});
        });
        //return result; //JavaScript object
         //JSON
        return JSON.stringify(result);
}