---
title: "Save URLs from Google Chrome to Apple Notes on Mac with Automator and a simple keyboard shortcut"
date: 2025-08-19T16:43:52+05:30
description: "An Automator workflow to save Chrome URLs into Apple Notes with a single keyboard shortcut."
categories: [archive]
---

<p>I use the Notes app on my Mac more than my bookmark manager. I needed a system to capture links that I actually visit and act on.</p>



<p>That’s when I started looking for a way to capture any webpage’s URL and title directly to Apple Notes with just a keyboard shortcut.</p>



<p>Here’s how I created a simple yet powerful automation using Apple’s built-in tools that can transform your link-saving workflow.</p>



<h2 class="wp-block-heading">Creating the Automator workflow</h2>



<h3 class="wp-block-heading">Step 1: Launch Automator and Create a Quick Action</h3>



<ol class="wp-block-list">
<li>Open <strong>Automator</strong> (found in Applications or via Spotlight)</li>



<li>Choose <strong>Quick Action</strong> when prompted for document type</li>



<li>At the top of the workflow area, set:
<ul class="wp-block-list">
<li>&#8220;Workflow receives&#8221; to <strong>no input</strong></li>



<li>&#8220;in&#8221; to <strong>any application</strong></li>
</ul>
</li>
</ol>



<h3 class="wp-block-heading">Step 2: Add the AppleScript Action</h3>



<ol class="wp-block-list">
<li>In the Actions library on the left, search for &#8220;Run AppleScript&#8221;</li>



<li>Drag the <strong>Run AppleScript</strong> action into your workflow area</li>



<li>Replace the default code with this script:</li>
</ol>



<pre class="wp-block-code"><code>-- Get URL from Chrome and save to Apple Notes
tell application "Google Chrome"
    if it is running then
        -- Get the URL and title of the active tab
        set currentURL to URL of active tab of front window
        set currentTitle to title of active tab of front window
        
        -- Create the note content
        set noteContent to currentTitle &amp; return &amp; currentURL
        
        -- Send to Notes app
        tell application "Notes"
            tell account "iCloud" -- You can change this to "On My Mac" if preferred
                tell folder "Links" -- Save to Links folder
                    make new note with properties {name:currentTitle, body:noteContent}
                end tell
            end tell
        end tell
        
        -- Display confirmation with URL
        display notification currentURL with title "Added to Notes"
        
    else
        display alert "Chrome is not running"
    end if
end tell
</code></pre>



<h3 class="wp-block-heading">Step 3: Save Y\your Quick Action</h3>



<ol class="wp-block-list">
<li>Save the workflow with a descriptive name like &#8220;Get URL from Chrome and save to Apple Notes&#8221;</li>



<li>This automatically installs it as a system service</li>
</ol>



<h2 class="wp-block-heading">Setting up the keyboard shortcut</h2>



<h3 class="wp-block-heading">Step 4: Configure System Keyboard Shortcuts</h3>



<ol class="wp-block-list">
<li>Open <strong>System Settings</strong> (or <strong>System Preferences</strong> on older macOS)</li>



<li>Navigate to <strong>Keyboard</strong> → <strong>Keyboard Shortcuts</strong></li>



<li>Select <strong>Services</strong> from the sidebar</li>



<li>Look under the <strong>General</strong> section for your newly created service</li>



<li>Check the box next to &#8220;Get URL from Chrome and save to Apple Notes&#8221;</li>



<li>Click <strong>Add Shortcut</strong> and press your desired key combination </li>
</ol>



<h2 class="wp-block-heading">How it works in practice</h2>



<p>Once set up, the workflow is simple:</p>



<ol class="wp-block-list">
<li>Browse to any webpage in Chrome</li>



<li>Press your assigned keyboard shortcut</li>



<li>Watch the notification confirm your URL was saved</li>



<li>Find your link organized in the Notes app&#8217;s &#8220;Links&#8221; folder</li>
</ol>



<h2 class="wp-block-heading">Troubleshooting common issues</h2>



<p><strong>Permission prompts</strong>: macOS will ask for permission to control Chrome and Notes the first time you run the automation. Grant these permissions for the workflow to function.</p>



<p><strong>Folder not found error</strong>: If you get an error about the &#8220;Links&#8221; folder, either create this folder in Notes manually or modify the script to use an existing folder.</p>



<p><strong>Script not triggering</strong>: Ensure you&#8217;ve properly assigned the keyboard shortcut in System Settings and that it doesn&#8217;t conflict with existing shortcuts.</p>



<p>This Automator workflow is a reliable way for me to capture web content directly into my note-taking system. On iPhone, there&#8217;s a simple &#8216;Add to Quick Note&#8217; option from a browser share sheet that&#8217;s easily accessible.</p>
