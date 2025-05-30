"""add Ribbon

Revision ID: 7d4f0e1551b6
Revises: 945b4ec6b88e
Create Date: 2025-04-07 20:40:55.428023

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7d4f0e1551b6'
down_revision = '945b4ec6b88e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('ribbons',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('color', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('ribbons')
    # ### end Alembic commands ###
