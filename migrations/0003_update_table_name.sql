ALTER TABLE `customers` RENAME TO `customer`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_service` (
	`id` text PRIMARY KEY NOT NULL,
	`date` text NOT NULL,
	`customer` text NOT NULL,
	`status` text NOT NULL,
	FOREIGN KEY (`customer`) REFERENCES `customer`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_service`("id", "date", "customer", "status") SELECT "id", "date", "customer", "status" FROM `service`;--> statement-breakpoint
DROP TABLE `service`;--> statement-breakpoint
ALTER TABLE `__new_service` RENAME TO `service`;--> statement-breakpoint
PRAGMA foreign_keys=ON;