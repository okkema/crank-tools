CREATE TABLE `service` (
	`id` text PRIMARY KEY NOT NULL,
	`date` text NOT NULL,
	`customer` text,
	FOREIGN KEY (`customer`) REFERENCES `customers`(`id`) ON UPDATE no action ON DELETE no action
);
