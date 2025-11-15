CREATE TABLE `refresh_tokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`token` varchar(512) NOT NULL,
	`jti` varchar(128) NOT NULL,
	`device_info` varchar(255),
	`ip_address` varchar(45),
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`revoked_at` timestamp,
	CONSTRAINT `refresh_tokens_id` PRIMARY KEY(`id`)
);
