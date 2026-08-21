import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
	await sql`

		CREATE TABLE widgets
		(
			created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	
			id         UUID     NOT NULL,
			user_id    UUID     NOT NULL,
			details    JSONB    NOT NULL DEFAULT '{}'::JSONB,
	
			CONSTRAINT widgets_id_pk PRIMARY KEY (id),
			CONSTRAINT widgets_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
		);
	
		CREATE UNIQUE INDEX widgets_user_id ON widgets USING btree (user_id);

	`.execute(db);
}
