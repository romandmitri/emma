import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
	await sql`

		CREATE TABLE stories
		(
			created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	
			id         UUID     NOT NULL,
			user_id    UUID     NOT NULL,
			raw        TEXT,
	
			CONSTRAINT stories_id_pk PRIMARY KEY (id),
			CONSTRAINT stories_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
		);
	
		CREATE UNIQUE INDEX stories_user_id ON stories USING btree (user_id);

	`.execute(db);
}
