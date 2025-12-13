## How it started
- Went home around 6:20AM and initialized repo at 7AM
- Fixed the bug at 8:54AM like a sane human being

## Haversine implementation (COMPLETED)
- ~~Next task (self-assigned) is to use haversine formula to calculate the distance between the two latitudes and longitudes~~ (COMPLETED)
	- ~~[Haversine Formula - Wikipedia](https://en.wikipedia.org/wiki/Haversine_formula)~~

## Next Task - API using Express.js and Node.js
- nodejs server
- 1 api using express js
- json
	- success: boolean
	- message: string
	- data: array from the database columns

## Extra Debugging tips to add in main for running processes:
### Simple
```
	setTimeout(() => {
		console.log('Active handles:', process._getActiveHandles().map(h => h.constructor.name));
		console.log('Active requests:', process._getActiveRequests().map(r => r.constructor.name));
	}, 50);
```
### Detailed
```
	setTimeout(() => {
		const handles = process._getActiveHandles();
		console.log('Active handles count:', handles.length);
		handles.forEach((h, i) => {
			console.log(i, h.constructor.name);
			try { console.log(Object.keys(h).filter(k => typeof h[k] !== 'function').slice(0, 8).reduce((acc, k) => { acc[k] = h[k]; return acc }, {}, {})); }
			catch (e) { console.log('inspect failed', e.message); }
		});
	}, 50);
```

## Testing API through curl example
```
curl --request POST \
      --header "Content-Type: application/json" \
      --data '[{start_lat:3,start_long:2,end_lat:6,end_long:8,distance_km:23,decision:"Invalid"}]' \
      http://localhost:3000/coordinates/add
```