import { useState } from 'react';
import { Tab } from 'fcstyle';

export function TagPage() {
  const [activeTab, setActiveTab] = useState('basic');

  // Basic horizontal tabs
  const basicTabs = [
    {
      id: 'basic',
      label: 'Basic',
      content: (
        <div>
          <h3>Basic Tab Usage</h3>
          <p>This is a basic horizontal tab example. Each tab contains different content.</p>
          <pre><code>{`<Tab items={tabs} />`}</code></pre>
        </div>
      )
    },
    {
      id: 'styling',
      label: 'Styling',
      content: (
        <div>
          <h3>Styled Tabs</h3>
          <p>Tabs can be styled using FCStyle's class builder system.</p>
          <pre><code>{`<Tab items={tabs} className="custom-tabs" p3 round2 variant="primary" />`}</code></pre>
        </div>
      )
    },
    {
      id: 'disabled',
      label: 'Disabled',
      content: (
        <div>
          <h3>Disabled Tabs</h3>
          <p>Individual tabs can be disabled by setting the disabled property.</p>
          <pre><code>{`{ id: 'disabled', label: 'Disabled', disabled: true }`}</code></pre>
        </div>
      )
    }
  ];

  // Vertical tabs example
  const verticalTabs = [
    {
      id: 'profile',
      label: 'Profile',
      content: (
        <div>
          <h3>Profile Settings</h3>
          <p>Manage your profile information and preferences.</p>
          <div style={{ padding: '1rem', backgroundColor: 'var(--color-background-hover)', borderRadius: '4px' }}>
            Profile content goes here...
          </div>
        </div>
      )
    },
    {
      id: 'security',
      label: 'Security',
      content: (
        <div>
          <h3>Security Settings</h3>
          <p>Configure password, two-factor authentication, and security preferences.</p>
          <div style={{ padding: '1rem', backgroundColor: 'var(--color-background-hover)', borderRadius: '4px' }}>
            Security settings content...
          </div>
        </div>
      )
    },
    {
      id: 'notifications',
      label: 'Notifications',
      content: (
        <div>
          <h3>Notification Preferences</h3>
          <p>Choose how you want to be notified about updates and activities.</p>
          <div style={{ padding: '1rem', backgroundColor: 'var(--color-background-hover)', borderRadius: '4px' }}>
            Notification settings...
          </div>
        </div>
      )
    }
  ];

  // Tabs with disabled items
  const tabsWithDisabled = [
    { id: 'enabled1', label: 'Enabled 1', content: <div>Content 1</div> },
    { id: 'disabled', label: 'Disabled', content: <div>This won't show</div>, disabled: true },
    { id: 'enabled2', label: 'Enabled 2', content: <div>Content 2</div> }
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Tab Component</h1>
        <p>Flexible tab component that supports horizontal and vertical orientations.</p>
      </div>

      <div className="page-content">
        {/* Basic Horizontal Tabs */}
        <section className="showcase">
          <h2>Basic Horizontal Tabs</h2>
          <p>The default tab orientation with basic styling.</p>
          <div className="showcase-demo">
            <Tab items={basicTabs} />
          </div>
          <div className="showcase-code">
            <pre><code>{`const tabs = [
  { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
  { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> }
];

<Tab items={tabs} />`}</code></pre>
          </div>
        </section>

        {/* Vertical Tabs */}
        <section className="showcase">
          <h2>Vertical Tabs</h2>
          <p>Tabs can be oriented vertically for sidebar-style navigation.</p>
          <div className="showcase-demo">
            <Tab
              items={verticalTabs}
              orientation="vertical"
              style={{ height: '300px' }}
            />
          </div>
          <div className="showcase-code">
            <pre><code>{`<Tab
  items={tabs}
  orientation="vertical"
  style={{ height: '300px' }}
/>`}</code></pre>
          </div>
        </section>

        {/* Disabled Tabs */}
        <section className="showcase">
          <h2>Disabled Tabs</h2>
          <p>Individual tabs can be disabled to prevent user interaction.</p>
          <div className="showcase-demo">
            <Tab items={tabsWithDisabled} />
          </div>
          <div className="showcase-code">
            <pre><code>{`const tabs = [
  { id: 'enabled', label: 'Enabled', content: <div>Content</div> },
  { id: 'disabled', label: 'Disabled', disabled: true, content: <div>Content</div> }
];

<Tab items={tabs} />`}</code></pre>
          </div>
        </section>

        {/* Controlled Tabs */}
        <section className="showcase">
          <h2>Controlled Tabs</h2>
          <p>Use state to control the active tab and respond to changes.</p>
          <div className="showcase-demo">
            <Tab
              items={basicTabs}
              defaultActiveId={activeTab}
              onChange={setActiveTab}
            />
            <p style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--color-background-hover)', borderRadius: '4px' }}>
              Active Tab: <strong>{activeTab}</strong>
            </p>
          </div>
          <div className="showcase-code">
            <pre><code>{`const [activeTab, setActiveTab] = useState('basic');

<Tab
  items={tabs}
  defaultActiveId={activeTab}
  onChange={setActiveTab}
/>`}</code></pre>
          </div>
        </section>

        {/* Styled Tabs */}
        <section className="showcase">
          <h2>Styled Tabs</h2>
          <p>Tabs support all FCStyle styling shortcuts and custom classes.</p>
          <div className="showcase-demo">
            <Tab
              items={basicTabs}
              className="custom-tabs"
              style={{ marginBottom: '1rem' }}
            />
            <Tab
              items={basicTabs}
              className="success-tabs"
            />
          </div>
          <div className="showcase-code">
            <pre><code>{`<Tab items={tabs} p3 round2 variant="primary" />
<Tab items={tabs} variant="success" border round1 />`}</code></pre>
          </div>
        </section>

        {/* Props Reference */}
        <section className="showcase">
          <h2>Props Reference</h2>
          <div className="props-table">
            <table>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>items</code></td>
                  <td><code>TabItem[]</code></td>
                  <td>-</td>
                  <td>Array of tab items with id, label, content, and optional disabled property</td>
                </tr>
                <tr>
                  <td><code>orientation</code></td>
                  <td><code>'horizontal' | 'vertical'</code></td>
                  <td><code>'horizontal'</code></td>
                  <td>Layout orientation of the tabs</td>
                </tr>
                <tr>
                  <td><code>defaultActiveId</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>ID of the initially active tab</td>
                </tr>
                <tr>
                  <td><code>onChange</code></td>
                  <td><code>(activeId: string) =&gt; void</code></td>
                  <td>-</td>
                  <td>Callback function called when active tab changes</td>
                </tr>
                <tr>
                  <td><code>children</code></td>
                  <td><code>React.ReactNode</code></td>
                  <td>-</td>
                  <td>Alternative content to display when not using items content</td>
                </tr>
                <tr>
                  <td><code>className</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Additional CSS classes</td>
                </tr>
                <tr>
                  <td><code>style</code></td>
                  <td><code>React.CSSProperties</code></td>
                  <td>-</td>
                  <td>Inline styles</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* TabItem Interface */}
        <section className="showcase">
          <h2>TabItem Interface</h2>
          <div className="showcase-code">
            <pre><code>{`interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
}`}</code></pre>
          </div>
        </section>
      </div>
    </div>
  );
}
