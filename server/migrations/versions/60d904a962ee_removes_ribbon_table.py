"""removes ribbon table

Revision ID: 60d904a962ee
Revises: 1c1d68815002
Create Date: 2025-04-15 10:01:11.704444

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.engine import reflection



# revision identifiers, used by Alembic.
revision = '60d904a962ee'
down_revision = '1c1d68815002'
branch_labels = None
depends_on = None


def upgrade():
    conn = op.get_bind()
    inspector = reflection.Inspector.from_engine(conn)

    # Check if the 'ribbons' table exists and drop it if it does
    if 'ribbons' in inspector.get_table_names():
        op.drop_table('ribbons')

    # Create a new temporary table with the desired schema
    op.create_table(
        'items_temp',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('item_type', sa.String, nullable=False),
        sa.Column('item_status', sa.String, default="new"),
        sa.Column('ribbon_color', sa.String, nullable=False),
        sa.Column('special_requests', sa.String),
        sa.Column('wristlet_id', sa.Integer, sa.ForeignKey('wristlets.id')),
        sa.Column('flower_id', sa.Integer, sa.ForeignKey('flowers.id'), nullable=False),
        sa.Column('accent_id', sa.Integer, sa.ForeignKey('accents.id')),
        sa.Column('order_id', sa.Integer, sa.ForeignKey('orders.id'), nullable=False)
    )

    # Copy data from the old table to the new table
    op.execute('''
        INSERT INTO items_temp (id, item_type, item_status, ribbon_color, special_requests, wristlet_id, flower_id, accent_id, order_id)
        SELECT id, item_type, item_status, CAST(ribbon_id AS TEXT), special_requests, wristlet_id, flower_id, accent_id, order_id
        FROM items
    ''')

    # Drop the old 'items' table
    op.drop_table('items')

    # Rename the temporary table to 'items'
    op.rename_table('items_temp', 'items')
    # ### end Alembic commands ###


def downgrade():
    # Create a new temporary table with the original schema
    op.create_table(
        'items_temp',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('item_type', sa.String, nullable=False),
        sa.Column('item_status', sa.String, default="new"),
        sa.Column('ribbon_id', sa.Integer),  # revert ribbon_color to ribbon_id
        sa.Column('special_requests', sa.String),
        sa.Column('wristlet_id', sa.Integer, sa.ForeignKey('wristlets.id')),
        sa.Column('flower_id', sa.Integer, sa.ForeignKey('flowers.id'), nullable=False),
        sa.Column('accent_id', sa.Integer, sa.ForeignKey('accents.id')),
        sa.Column('order_id', sa.Integer, sa.ForeignKey('orders.id'), nullable=False)
    )

    # Copy data from the modified table to the new table
    op.execute('''
        INSERT INTO items_temp (id, item_type, item_status, ribbon_id, special_requests, wristlet_id, flower_id, accent_id, order_id)
        SELECT id, item_type, item_status, CAST(ribbon_color AS INTEGER), special_requests, wristlet_id, flower_id, accent_id, order_id
        FROM items
    ''')

    # Drop the modified 'items' table
    op.drop_table('items')

    # Rename the temporary table back to 'items'
    op.rename_table('items_temp', 'items')

    # Recreate 'ribbons' table if needed during downgrade
    op.create_table('ribbons',
                    sa.Column('id', sa.Integer, primary_key=True),
                    sa.Column('color', sa.VARCHAR(), nullable=False),
                    )

    # ### end Alembic commands ###
