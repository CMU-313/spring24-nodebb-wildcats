## NEW FEATURE - Instructor Only Announcements
With the new feature, instructors will be able to toggle a setting to enable/disable students from posting announcements.

## USAGE
With an instructor account, click on your icon on the top right, then go to **Settings**, under **Instructor Only** there's a checkbox that says "Only Instructors are able to post announcements".

Checking the checkbox will limit the ability for posting announcements in the forum to instructor and admin only. Students will not be able to post into the announcements category. Noted that students are still able to view and reply to the announcements.

If the checkbox is unchecked, then students will be able to post into the announcements as usual.

This setting is forum wise - one instructor updating such setting will cause the whole forum's settings to be updated.

Please also make sure you have the default category named "Announcements". If you don't have such category, the setting will not work. If you have multiple categories with this name, the setting will only work on the oldest one of them.


## USER TESTING
You can test the new feature by following these steps:
1. Create an account, select the account type as "instructor".
2. As mentioned in the "Usage" section, check "Only Instructors are able to post announcements".
3. Create another account, select the account type to be "student".
4. Try to post in the "Announcements" category with proper title and content length.

You'll see an error message that says "Your instructor disabled you to post announcements."

## AUTOMATED TESTING

The automated test can be found under **test/topic.js**, between line 173 and line 212. The test make sure that if the instructor only announcements setting is enabled, then instructors can still post in the announcements category, but students cannot post in the announcements category. 

Since the logic for replying and viewing the post are isolated, we don't need to test on them; since the default setting is false for the instructor only announcements, the ability for general user to post is already covered by the existing generalized test. Thus, the added automated test is effectice and sufficient.