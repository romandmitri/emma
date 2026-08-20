import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
	// NOTE: Making singular "user" table is NOT ideal possible because "user" keyword is reserved.
	await sql`

		CREATE TABLE users
		(
			created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	
			id         UUID     NOT NULL,
			email      TEXT     NOT NULL,
			details    JSONB    NOT NULL DEFAULT '{}'::JSONB,
			roles      JSONB    NOT NULL DEFAULT '[]'::JSONB,
	
			CONSTRAINT users_id_pk PRIMARY KEY (id)
		);
	
		CREATE UNIQUE INDEX users_email_btree ON users USING btree (LOWER(email));
		CREATE INDEX users_details_gin ON users USING gin (details);

	`.execute(db);
}
