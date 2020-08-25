-- CREATE TABLE notes (
-- 	id serial PRIMARY KEY NOT NULL,
-- 	title VARCHAR(1000) NOT NULL,
-- 	content TEXT NOT NULL,
-- 	created TIMESTAMP NOT NULL,
-- 	PRIMARY KEY (id)
-- );

insert into notes (id, title, content, created)
values (1, 'Zuera Never Ends', 'Doggo ipsum pats boof porgo boof bork smol borking doggo with a long snoot for pats, extremely cuuuuuute blep noodle horse clouds pupperino, you are doin me a concern porgo thicc super chub. Vvv dat tungg tho floofs smol borking doggo with a long snoot for pats, long water shoob doge. Long woofer aqua doggo borkf fat boi what a nice floof heck, much ruin diet ur givin me a spook smol very good spot, smol heckin most angery pupper I have ever seen boof. Many pats smol borking doggo with a long snoot for pats such treat, heckin angery woofer.', 'Wed Mar 25 2020 16:08:46');

insert into notes (id, title, content, created)
values (2, 'Supermercado', 'chocolate, leite, castanhas, farinha, ovos.', 'Wed Mar 25 2020 16:08:46');

-- parente table
CREATE TABLE notes (
	id serial NOT NULL,
	title VARCHAR(1000) NOT NULL,
	content TEXT NOT NULL,
	search_vector TSVECTOR,
	created TIMESTAMP NOT NULL,
	PRIMARY KEY (id)
);
-- valid child table
CREATE TABLE notesconfigs (
	note_id int NOT NULL,
	background_color VARCHAR(1000) NOT NULL,
	is_archived boolean DEFAULT FALSE NOT NULL,
	is_pinned boolean DEFAULT FALSE NOT NULL,
	PRIMARY KEY (note_id),
	CONSTRAINT fk_note_id
	FOREIGN KEY (note_id)
	REFERENCES notes (id)
	ON DELETE CASCADE
);

CREATE TABLE labels(
	id serial NOT NULL,
	labels TEXT,
	PRIMARY KEY (id)
);

CREATE TABLE notes_labels(
	note_id int NOT NULL,
	label_id int NOT NULL,
	PRIMARY KEY(note_id, label_id),
	FOREIGN KEY (note_id) REFERENCES notes(id) ON UPDATE CASCADE,
	FOREIGN KEY (label_id) REFERENCES labels(id) ON UPDATE CASCADE,
	FOREIGN KEY (label_id) REFERENCES labels(id) ON DELETE CASCADE
);


insert into notes (id, title, content, created)
values (1, 'Her', 'zzzzzzzz', 'Wed Mar 25 2020 16:08:46');
insert into notesconfigs (note_id, background_color, is_archived, is_pinned)
values ( 1, '#f28b82', false, false);

insert into notes (id, title, content, created)
values (2, 'Carol', 'xixixixi', 'Wed Mar 25 2020 16:08:46');
insert into notesconfigs (note_id, background_color, is_archived, is_pinned)
values ( 2, '#f28b82', true, true);

insert into labels (id, labels)
values ( 1, 'filmes');
insert into labels (id, labels)
values ( 2, 'series');

INSERT into notes_labels(note_id, label_id) values(1, 1);
INSERT into notes_labels(note_id, label_id) values(1, 2);
INSERT into notes_labels(note_id, label_id) values(2, 1);
INSERT into notes_labels(note_id, label_id) values(2, 2);