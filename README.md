Django drf angular starter framework was used: https://github.com/cleechtech/django-drf-starter-project

My Little Package Devpost link: http://devpost.com/software/my-little-package

Problem Introduction
=============

The problem that we focused on was inefficient mailing package distribution systems.

These mailing systems are often rooted in the culture of organizations and the main issue with these systems are their heavy dependence on paper, writing, and manual methods for managing packages.

Specifically, each of the creators of this project have lived in the Residence Halls at the University of Arizona in at least one instance.
We have also been employed as resident assistants, and are very familiar with the package distribution system employed in each residence hall today.

Packages are managed manually by desk assistants. A binder with written logs containing student and package related information sits at the mailing desk and residents discover that they have packages ready for pick-up when they find package description slips in their mailboxes. These slips of information are filled out by hand by desk assistants as well.

Overall, residents check their mailboxes infrequently and packages may pile-up in storage, especially after certain delivery rushes throughout the year.
The system is inefficient and is similar to a frontend interface polling a backend server at intervals of time to check if anything has changed.

Solution
===========

Our vision is of a more automated and digitized system for distributing packages. Desk assistants use our developed mobile application that includes use of open source text recognition software to scan packages. This information is immediately logged into our postgresql database supported by a django server with an angular-material frontend interface for digital management of the package database through a table view with export CSV functionality for keeping track of information and add/remove operations, used when necessary.

The django server is able to interface with the database as well as other applications. Cross-references to student information as well as error checking is handled in the server. Given scanned package information (address block) and referencing student information, all the information related to the mailing packages is collected, and the server interfaces with Amazon EC2 queuing services and is tasked with using Cisco Tropo APIs to send SMS notifications to the owners of the packages received by the organization.

As a result, this design allows for enhanced mailing package management, that within seconds, is able to log and determine package information and send SMS/Email notification to receivers, thus bypassing hand-written methods of logging mail, manual notification systems, and frequent polling inefficiencies by residents to check if a package has arrived.

This methodology can also be applied as a solution/design to other problem sets as well.
