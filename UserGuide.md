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

## NEW FEATURE - Anonymous Posting
With the new feature, users will be able to toggle a post setting to enable/disable anonymous posting.

## USAGE
After logging into your account, click on any of the categories to post in.

Click on **New Topic** to start drafting the post.

Before clicking **Submit**, check the checkbox labeled **Anonymize Your Post** to hide your username and post under the name 'Anonymous'. If the checkbox is left unchecked, your username will show as normal.

## USER TESTING
To test this feature, please first set up using the following directions. 

1. Make sure your npm run lint and npm run test is working normally
2. cd into cd plugins/nodebb-plugin-composer/
3. Run npm link
4. Go back to main folder directory using cd ../.. (You can double check you are in the main folder by using pwd)
5. Run npm link nodebb-plugin-composer
6. Run ./nodebb build
7. run ./nodebb plugins 
Make sure you see this (especially the nodebb-plugin-composer@0.0.1):
    * nodebb-plugin-2factor@5.1.2 (installed, disabled)
	* nodebb-plugin-composer@0.0.1 (installed, disabled)
	* nodebb-plugin-composer-default@9.2.4 (installed, enabled)
	* nodebb-plugin-dbsearch@5.1.5 (installed, disabled)
	* nodebb-plugin-emoji@4.0.6 (installed, enabled)
	* nodebb-plugin-emoji-android@3.0.0 (installed, enabled)
	* nodebb-plugin-location-to-map@0.1.1 (installed, disabled)
	* nodebb-plugin-markdown@10.1.1 (installed, enabled)
	* nodebb-plugin-mentions@3.0.12 (installed, enabled)
	* nodebb-plugin-spam-be-gone@1.0.2 (installed, disabled)
	* nodebb-rewards-essentials@0.2.1 (installed, enabled)
	* nodebb-widget-essentials@6.0.1 (installed, enabled)

8. Run ./nodebb activate nodebb-plugin-composer
Please make sure that this one is enabled:  nodebb-plugin-composer@0.0.1 (installed, enabled)
9. Run ./nodebb start
10. Run ./nodebb reset -p nodebb-plugin-composer-default
Make sure this one is disabled: nodebb-plugin-composer-default@9.2.4 (installed, disabled)
11. Stop nodebb, build nodebb, start nodebb 

You can test the new feature by following these steps:
1. Create an account, select any account type.
2. Click on any of the categories to post in and start drafting a post by clicking **New Topic**.
3. Check the **Anonymize Your Post** checkbox.
4. Click **Submit** to make the post, and see that 'Anonymous' replaces your username.
5. Make another post by following step 2.
6. This time, do NOT check the **Anonymize Your Post** checkbox.
7. Click **Submit** to make the post, and see that your username shows as normal.

We are aware that clicking the anonymous checkbox does not always properly hide the poster's name 
and we are working on a fix, thank you for your understanding!

## AUTOMATED TESTING

The added automated test can be found in **test/posts.js**. This test makes sure that every post has an isAnonymous property, and if you check the anonymize checkbox, it sets isAnonymous to true. 

Since the default for isAnonymous is false, the ability to post a non-anonymous post is already covered by the existing post tests. Therefore, the added test that tests for isAnonymous==true is sufficient to test that checking the checkbox does indeed anonymize the post.
