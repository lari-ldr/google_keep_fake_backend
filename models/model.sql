-- CREATE TABLE notes (
-- 	id serial PRIMARY KEY NOT NULL,
-- 	title VARCHAR(1000) NOT NULL,
-- 	content TEXT NOT NULL,
-- 	created TIMESTAMP NOT NULL,
-- 	PRIMARY KEY (id)
-- );

-- parente table
CREATE TABLE notes (
	id serial NOT NULL,
	title VARCHAR(1000) NOT NULL,
	content TEXT NOT NULL,
	created TIMESTAMP NOT NULL,
	PRIMARY KEY (id)
);
insert into notes (id, title, content, created)
values (1, 'Zuera Never Ends', 'Doggo ipsum pats boof porgo boof bork smol borking doggo with a long snoot for pats, extremely cuuuuuute blep noodle horse clouds pupperino, you are doin me a concern porgo thicc super chub. Vvv dat tungg tho floofs smol borking doggo with a long snoot for pats, long water shoob doge. Long woofer aqua doggo borkf fat boi what a nice floof heck, much ruin diet ur givin me a spook smol very good spot, smol heckin most angery pupper I have ever seen boof. Many pats smol borking doggo with a long snoot for pats such treat, heckin angery woofer.', 'Wed Mar 25 2020 16:08:46');

insert into notes (id, title, content, created)
values (2, 'Supermercado', 'chocolate, leite, castanhas, farinha, ovos.', 'Wed Mar 25 2020 16:08:46');
-- child table
CREATE TABLE notesconfigs (
	note_id int NOT NULL,
	background_color VARCHAR(1000) NOT NULL,
	is_archived boolean DEFAULT FALSE NOT NULL,
	is_pinned boolean DEFAULT FALSE NOT NULL,
	it_has_any_label boolean DEFAULT FALSE NOT NULL,
	PRIMARY KEY (note_id),
	CONSTRAINT fk_note_id
	FOREIGN KEY (note_id)
	REFERENCES notes (id)
	ON DELETE CASCADE
);

insert into notesconfigs (note_id, background_color, is_archived, is_pinned, it_has_any_label)
values ( 1, '#f28b82', false, false, false);

insert into notesconfigs (note_id, background_color, is_archived, is_pinned, it_has_any_label)
values ( 2, 'pink', false, true, false);

-- -- one to many
-- CREATE TABLE labels (
-- 	note_id int NOT NULL,
-- 	label_one VARCHAR(1000),
-- 	label_two VARCHAR(1000),
-- )