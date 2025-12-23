## How it started
- Went home around 6:20AM and initialized repo at 7AM
- Fixed the bug at 8:54AM like a sane human being

## ~~Haversine implementation~~ (COMPLETED)
- ~~Next task (self-assigned) is to use haversine formula to calculate the distance between the two latitudes and longitudes~~ (COMPLETED)
	- ~~[Haversine Formula - Wikipedia](https://en.wikipedia.org/wiki/Haversine_formula)~~

## ~~Next Task - API using Express.js and Node.js~~ (COMPLETED)
~~- nodejs server~~
~~- 1 api using express js~~
~~- json~~
	~~- success: boolean~~
	~~- message: string~~
	~~- data: array from the database columns~~

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

## ENV help
### Creating a JWT Secret Key (run in console)
```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
```

## SSL Cert help
### Created self trusted certificates for localhost testing
```
mkcert -install
mkcert localhost 127.0.0.1 ::1
```
- Also added dev dependency for `mkcert` as `vite-plugin-mkcert` in frontend's package.json

## SQL Commands Stuff
### Creating table for storing OTPs as well as editing user table if is_verified column doesn't exist
```sql

SELECT
    CASE
        WHEN EXISTS (SELECT email FROM geo_news.users WHERE email = 'qujazapy@mailinator.com' AND password = 'Pa$$w0rd!') THEN 1
        ELSE 0
    END AS ExistsCheck;

SELECT 
	e.*,	
	u.name
FROM geo_news.entries e LEFT JOIN geo_news.users u ON e.user_id = u.id 

ALTER TABLE geo_news.entries 
DROP constraint entries_users_FK;

SELECT email FROM geo_news.users WHERE email [NOT] IN 'example@example.com'

ALTER TABLE geo_news.users ADD COLUMN is_verified BOOLEAN DEFAULT false NOT NULL 

CREATE TABLE IF NOT EXISTS geo_news.verification_emails (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	user_id INT NOT NULL,
	email_sent BOOLEAN DEFAULT false NOT NULL,
	OTP_value INT DEFAULT null,
	expiration_date TIMESTAMP DEFAULT null,
	created_at TIMESTAMP DEFAULT current_timestamp() NOT NULL,
	CONSTRAINT fk_user_verification_email
        FOREIGN KEY (user_id)
        REFERENCES geo_news.users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

INSERT INTO geo_news.verification_emails
(id, user_id, email_sent, OTP_value, expiration_date, created_at)
VALUES(2, 2, 1, 887463, current_timestamp(), current_timestamp());

SELECT
    CASE
        WHEN EXISTS (SELECT geo_news.verification_emails.user_id FROM geo_news.verification_emails WHERE user_id = 2 AND email_sent = 1 AND '2025-12-24 01:45:49.000' > current_timestamp()) THEN 1
        ELSE 0
    END AS ExistsCheck;

UPDATE geo_news.users SET is_verified = 1 WHERE id = 14;

SELECT geo_news.verification_emails.OTP_value, geo_news.users.is_verified 
FROM geo_news.verification_emails, geo_news.users
WHERE user_id = 16 AND email_sent = 1 AND '2025-12-23 22:04:58.000' < expiration_date AND geo_news.users.is_verified = 0 AND OTP_value = 987955

SELECT is_verified FROM geo_news.users WHERE id = 13 AND is_verified = 1

```

## Next Step [24th December]
- Implement email verification through [Nodemailer](https://nodemailer.com/) and [Ethereal email service](https://ethereal.email/)